package com.foodapp.order.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class FeignAuthInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        ServletRequestAttributes attrs =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attrs == null) return;

        HttpServletRequest request = attrs.getRequest();

        // Forward JWT
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null) {
            template.header("Authorization", authHeader);
        }

        // Forward user context (added by gateway)
        String userId = request.getHeader("X-USER-ID");
        if (userId != null) {
            template.header("X-USER-ID", userId);
        }

        String role = request.getHeader("X-USER-ROLE");
        if (role != null) {
            template.header("X-USER-ROLE", role);
        }
    }
}
