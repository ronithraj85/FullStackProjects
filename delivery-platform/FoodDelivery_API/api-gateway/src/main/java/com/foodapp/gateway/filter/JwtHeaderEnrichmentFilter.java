package com.foodapp.gateway.filter;

import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JwtHeaderEnrichmentFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange,
                             GatewayFilterChain chain) {

        return ReactiveSecurityContextHolder.getContext()
                .map(ctx -> ctx.getAuthentication())
                .flatMap(auth -> enrichRequest(exchange, chain, auth))
                .switchIfEmpty(chain.filter(exchange));
    }

    private Mono<Void> enrichRequest(ServerWebExchange exchange,
                                     GatewayFilterChain chain,
                                     Authentication authentication) {

        if (!(authentication.getPrincipal() instanceof Jwt jwt)) {
            return chain.filter(exchange);
        }

        String userId = String.valueOf(jwt.getClaim("userId"));
        String email = jwt.getSubject();
        String roles = String.join(
                ",",
                jwt.getClaimAsStringList("authorities")
        );

        ServerHttpRequest mutatedRequest =
                exchange.getRequest()
                        .mutate()
                        .header("X-USER-ID", userId)
                        .header("X-USER-EMAIL", email)
                        .header("X-USER-ROLES", roles)
                        .build();

        return chain.filter(
                exchange.mutate()
                        .request(mutatedRequest)
                        .build()
        );
    }

    @Override
    public int getOrder() {
        return -1; // run early
    }
}
