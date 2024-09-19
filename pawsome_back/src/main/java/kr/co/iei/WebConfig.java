package kr.co.iei;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@Configuration
@EnableWebSocket
public class WebConfig {
	@Bean
	public BCryptPasswordEncoder bCrypt() {
		return new BCryptPasswordEncoder();
	}

}
