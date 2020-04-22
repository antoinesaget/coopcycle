package com.info4.coopcycle.aop.logging;

import com.info4.coopcycle.service.MailService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Arrays;

@Aspect
public class MailLoggingAspect {
    private Logger logger = LoggerFactory.getLogger(MailService.class);

    @Pointcut("execution(* com.info4.coopcycle.service.MailService.send*(..))")
    public void sendEmail() {/* Do nothing */}
    
    @After("sendEmail()")
    public void sendNewEmail(JoinPoint joinPoint){
        logger.debug("Call to : {}() with argument[s] = {}", joinPoint.getSignature().getName(), Arrays.toString(joinPoint.getArgs()));
    }
}
