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

                .antMatchers("/**","/oauth2/**", "/login**").permitAll()
                .anyRequest().permitAll()

                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .authorizationRequestRepository(new InMemoryRequestRepository())
                .and()
                .successHandler(  this::successHandler )

                .and()
                .exceptionHandling()
                .authenticationEntryPoint(this::authenticationEntryPoint);

        http.addFilterBefore(tokenFilter, UsernamePasswordAuthenticationFilter.class);
        http.csrf().disable();



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
                               HttpServletResponse response,
                               Authentication authentication) throws IOException {

        String token = tokenStore.generateToken(authentication);
        response.getWriter().write(
                mapper.writeValueAsString(Collections.singletonMap("accessToken", token))
        );
    }

        public void authenticationEntryPoint(HttpServletRequest request,
                HttpServletResponse resposne,
                AuthenticationException authException) throws IOException{

            resposne.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resposne.getWriter().write(mapper.writeValueAsString(Collections.singletonMap("error", "Unauthenticated")));
        }
}
