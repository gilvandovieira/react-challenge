# Desafio loja de aluguel de livros - React

## Oportunidade

Olá! Temos uma oportunidade de desenvolvedor na Digivox e gostaríamos que você participasse do nosso processo seletivo. Ao fim do processo, você receberá um feedback do nosso time com o resultado. 😃

## Detalhamento do desafio

Criar uma API REST para gerenciamento de uma loja que aluga livros. Através destes serviços a empresa poderá manter o cadastro dos livros, clientes, aluguéis e acompanhar em um dashboard o que está sendo devolvido e alugado em tempo real.

## Serviços a serem criados:

 - Manter livro;
 - Manter cliente;
 - Reservar de livro;
 - Cancelar reserva;
 - Alugar livro;
 - Devolução de livro;
 - Dashboard com informações sobre: 
  - Livros a serem devolvidos no período semanal, com seus valores;
  - Livros alugados no período semanal, com seus valores;

OBS: Para o serviço de reserva, o livro será disponibilizado ao cliente em uma data agendada (ou seja, um agendamento) enquanto no de aluguel do livro ele é disponibilizado no exato momento da solicitação.

## Tecnologias Desejáveis

 - JDK 1.8+;
 - Maven 3.3+;
 - Banco de dados Postgres;
 - Framework Spring Boot;
 - React
 
OBS: Sinta-se à vontade para utilizar outras tecnologias.

## O que avaliaremos

 - Coesão do código-fonte
 - Boas práticas e padrões;
 - Aderência aos serviços solicitados;

## Instruções

1. Após o envio do desafio você terá 5 dias para desenvolver. Seja criativo! Utilize as ferramentas e frameworks ao seu favor.
2. Atualize o README.MD do projeto e detalhe as etapas para que a aplicação execute com sucesso.
3. Após finalizado envie um e-mail para dev-challenges@digivox.com.br, informando onde o projeto está hospedado.


# O início:

#### Requisitos
- Ambiente windows ou linux
- Conexão com a internet
- Java 11
- nodejs
- Docker (opcional, ver o cap. de Docker lá embaixo)
- Python (muito opicional, haha )

Primeiro vamos definir uma váriavel de ambiente.
[Cheque esse guia para seu sistema operacional](https://www.java.com/pt_BR/download/help/path.xml)

Nas variáveis de ambiente de usuário crie uma variável com nome ```SPRING_DATASOURCE_URL``` e atribua o valor ```jdbc:postgresql://localhost:5432/``` e ```SPRING_DATASOURCE_PASSWORD``` com ```yourpassword```.
> Se você tiver ```docker``` você pode iniciar uma instância do postgres com esse comando:  
```docker run --name postgres -e POSTGRES_PASSWORD=yourpassword -d postgres```

Caso você já tenha uma instância do postgres na sua máquina, tu pode usá-la, alterando as váriaveis de ambiente para a sua configuração atual.

Abra o terminal da sua máquina no diretório ```api/``` e execute o comando ```mvnw install package```. Isso irá baixar todas as dependências do Spring como também empacotar o projeto.

Volte para raiz do projeto e abra a pasta ```ui/``` ainda no terminal.
Execute o comando ```npm install``` isso irá fazer com que sejam baixadas as dependências do React e outros.

---
## Executando os projetos (sem Docker)

Volte na pasta ```api/``` e execute o comando ```mvnw spring-boot:run```

Abra outra aba do seu terminal ou uma nova janela e vá para pasta ```ui/``` e execute o comando ```npm run start```

---
### No terminal

> Se você tiver python na sua máquina e quiser explorar a api pelo terminal, eu recomendaria o [http](https://httpie.org/) do time httpie;

A api estará em ´´´http://localhost:8080/api´´´
- ```http://localhost:8080/api/clientes``` métodos aceitos GET e POST. No POST você deve enviar o payload ```{"nome":"John"}``` Exemplo de uso ```echo '{"nome":"John"}' | http POST localhost:8080/api/clientes```
- ```http://localhost:8080/api/clientes/{id}``` Aqui os métodos disponíveis são o GET, PUT e DELETE. No PUT você pode alterar os dados do cliente, exemplo  ```echo '{"nome":"John Williams"}' | http PUT localhost:8080/api/clientes/1``` 
- ```http://localhost/api/livros``` Segue o mesmo esquema do Cliente mas o objeto tem esse formato:  ```{"nome":"Sommerville", "autor":"Engenharia de Software"}```

> Clientes e Livros precisam estar criados para a próxima sessão

- ```http://localhost:8080/api/operacoes/reservar``` Método que somente aceita POST e o payload é (exemplo) ```{ "cliente": "1", "livro": "1"}``` criando uma reserva de livro para um cliente.
- ```http://localhost:8080/api/operacoes/reservas``` é um método que aceita GET e retorna as reservas efetuadas.
- ```http://localhost:8080/api/operacoes/cancelar``` é um método POST que aceita o payload (exemplo) ```{"reserva":"1"}``` cancela aquela reserva específica.
- ```http://localhost:8080/api/operacoes/alugar``` é um método que aceita POST com o payload (exemplo) ```{ "cliente": "1", "livro": "1"}``` criando o vínculo de aluguel do livro com o cliente.
- ```http://localhost:8080/api/operacoes/alugueis``` é um método que aceita GET retornando os aluguéis ativos.
- ```http://localhost:8080/api/operacoes/devolver``` é um método que aceita POST com o payload (exemplo) ``` { "devolucao": "1" }``` desfazendo o aluguel.

---

### Pela interface

Abra seu browser e vá para o link: [http://localhost:3000]()

Você será direcionado para a página inicial do projeto React

![Página inicial](https://raw.githubusercontent.com/gilvandovieira/react-challenge/master/docs/1.png "Página inicial")

Mais imagens de referência você encontrará na pasta ```docs/``` do repositório.

---

## Usando Docker

O Docker oferece o executável ´´´docker´´´ como também o ```docker-compose```

Se você checar o arquivo na raiz do repositório ```docker-compose.yaml``` você terá todas as configurações já feitas e prontas para serem usadas.

As imagens dos containers estão disponíveis no [Docker Hub](https://hub.docker.com).

Para instanciar todas as imagens use o comando de terminal ```docker-compose up``` na raiz do repositório. Elá irá baixar as imagens da api e da ui junto com o banco de dados e irão se juntar em harmonia.

No arquivo ```docker-compose.yaml``` você pode editar as váriaveis do ambiente do docker
```yaml
postgres:
        image: "postgres:latest"
        environment: 
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: yourpassword
        ports: 
            - "5432:5432"
        volumes: 
            - "gilvando_db:/var/lib/postgres/database"
        networks:
            gilvando_net: 
                aliases: 
                    - gilvando_net
    api:
        image: "gilvandovieira/gilvando-dgvx-spring-api:0.1.3"
        environment:
            - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/postgres
            - SPRING_DATASOURCE_PASSWORD=yourpassword
```
Você pode alterar a senha ```yourpassword``` nos dois locais para um de sua preferência.

E está pronto o ambiente.

# Considerações finais

Eu tive dificuldade em fazer o mapeamento *ManyToMany* do Spring JPA/Hibernate então eu decidi pela relação *OneToMany-ManyToOne*. Passado esse momento de dúvida, que a relação ManyToMany estava criando StackOverFlow no java na hora de deserilizar os objetos. Tentei várias abordagens mas no fim fiquei só frustrado.

Escolhi a opção do bootstrap usando uma cdn, eu poderia ter optado pelo React Material que são componentes de primeira classe, mas prefiri uma abordagem mais pé no chão. Minha auto avaliação da interface é que poderia ser melhor, mas o que foi entregue está minimamente usável.

Tempo de trabalho gasto: 
 - 22h desenvolvendo api e ui.
 - 1h escrevendo documentação no Readme
 - 5h para polir algumas (rough edges) inconsistências nos nomes de entidade, json, etc. Também criar as imagens de container.