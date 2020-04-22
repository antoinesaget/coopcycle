package com.info4.coopcycle.config;

import com.info4.coopcycle.aop.logging.MailLoggingAspect;

import io.github.jhipster.config.JHipsterConstants;

import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;

@Configuration
@EnableAspectJAutoProxy
public class MailLoggingAspectConfiguration {

    @Bean
    @Profile(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT)
    public MailLoggingAspect mailLoggingAspect(Environment env) {
        return new MailLoggingAspect();
    }
}
