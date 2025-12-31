package com.healthcare.clinic.security;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    private String jwtSecretKey;

    private JwtTokenProvider(){
        this.jwtSecretKey = getTheSecretKey();
    }

    private String getTheSecretKey() {
        try{
            KeyGenerator key = KeyGenerator.getInstance("HmacSHA256");
            SecretKey secretKey = key.generateKey();
            return Base64.getEncoder().encodeToString(secretKey.getEncoded());
        }
        catch (Exception e){
            throw new RuntimeException("Error in generating the key");
        }
    }

    public String generateToken(Authentication authentication){

        String username = authentication.getName();

        Date currentDate = new Date();

        Date expireDate = new Date(currentDate.getTime() + 604800000);

        // Extract roles/authorities from Authentication
        List<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        String token = Jwts.builder()
                .subject(username)
                .claim("roles",roles)
                .issuedAt(new Date())
                .expiration(expireDate)
                .signWith(getKey())
                .compact();

        return token;
    }

    private Key getKey(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecretKey));
    }

    // get username from JWT token
    public String getUsername(String token){

        return Jwts.parser()
                .verifyWith((SecretKey) getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // validate JWT token
    public boolean validateToken(String token){
        Jwts.parser()
                .verifyWith((SecretKey) getKey())
                .build()
                .parse(token);
        return true;

    }

}
