package com.ecommerce.Config;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    // this method will write JSON results
    private ObjectMapper mapper;
    private TokenStore tokenStore;
    private TokenFilter tokenFilter;

    public SecurityConfig(ObjectMapper mapper, TokenStore tokenStore, TokenFilter tokenFilter) {
        this.mapper = mapper;
        this.tokenStore = tokenStore;
        this.tokenFilter = tokenFilter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().authorizeRequests()
<<<<<<< HEAD
                .antMatchers("/**","/oauth2/**", "/login**").permitAll()
                .anyRequest().permitAll()
=======
                .antMatchers("/oauth2/**", "/login**").permitAll()
                .anyRequest().authenticated()
>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71
                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .authorizationRequestRepository(new InMemoryRequestRepository())
                .and()
                .successHandler(  this::successHandler )
<<<<<<< HEAD
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(this::authenticationEntryPoint);

        http.addFilterBefore(tokenFilter, UsernamePasswordAuthenticationFilter.class);
        http.csrf().disable();
=======
        .and()
        .exceptionHandling()
        .authenticationEntryPoint(this::authenticationEntryPoint);

        http.addFilterBefore(tokenFilter, UsernamePasswordAuthenticationFilter.class);
>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71

    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedMethods(Collections.singletonList("*"));
        config.setAllowedOrigins(Collections.singletonList("*"));
        config.setAllowedHeaders(Collections.singletonList("*"));


        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;

    }

    public void successHandler(HttpServletRequest request,
<<<<<<< HEAD
                               HttpServletResponse response,
                               Authentication authentication) throws IOException {
=======
                                HttpServletResponse response,
                                Authentication authentication) throws IOException {
>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71

        String token = tokenStore.generateToken(authentication);
        response.getWriter().write(
                mapper.writeValueAsString(Collections.singletonMap("accessToken", token))
        );
    }

    public void authenticationEntryPoint(HttpServletRequest request,
<<<<<<< HEAD
                                         HttpServletResponse resposne,
                                         AuthenticationException authException) throws IOException{
=======
                                          HttpServletResponse resposne,
                                          AuthenticationException authException) throws IOException{
>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71

        resposne.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        resposne.getWriter().write(mapper.writeValueAsString(Collections.singletonMap("error", "Unauthenticated")));
    }
}
