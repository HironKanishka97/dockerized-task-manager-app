FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY target/st-server.jar st-server.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "st-server.jar"]
