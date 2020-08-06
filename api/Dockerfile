FROM openjdk:jdk-slim

WORKDIR /app

COPY target/api-0.1.3.jar .

EXPOSE 8080

ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/postgres

CMD [ "java", "-jar", "api-0.1.3.jar" ]