# Frontend Architecture

## Objetivo

Esta arquitetura foi criada para ser simples, escalável e fácil de
manter, evitando overengineering. Cada camada possui apenas uma
responsabilidade.

    src/
    ├── app/
    │   └── api/
    │       └── proxy/
    │           └── [...path]/
    │               └── route.ts
    │
    ├── lib/
    │   └── api/
    │       ├── client.ts
    │       ├── errors.ts
    │       ├── index.ts
    │       ├── types.ts
    │       ├── search-request.ts
    │       └── search-mapper.ts
    │
    ├── shared/
    │   ├── table/
    │   ├── layout/
    │   ├── feedback/
    │   └── types/
    │
    └── features/
        └── user/
            ├── api/
            │   ├── user.api.ts
            │   ├── user.query.ts
            │   └── user.mutation.ts
            ├── UserForm.tsx
            ├── UserTable.tsx
            ├── UserFilters.tsx
            ├── user.schema.ts
            └── user.types.ts

------------------------------------------------------------------------

# Camadas

## app/api/proxy

Único proxy entre o Next.js e o Spring Boot.

Responsabilidades:

-   Encaminhar requisições para a API.
-   Adicionar Authorization automaticamente.
-   Trabalhar com cookies HttpOnly.
-   Evitar expor a URL do backend ao navegador.

A aplicação nunca chama diretamente o Spring Boot.

------------------------------------------------------------------------

## lib/api

Infraestrutura reutilizável.

### client.ts

Wrapper do fetch.

Expõe apenas:

-   get()
-   post()
-   put()
-   patch()
-   delete()

Não conhece nenhuma entidade do sistema.

------------------------------------------------------------------------

### errors.ts

Centraliza erros HTTP.

Exemplo:

``` ts
throw new ApiError(status, message);
```

------------------------------------------------------------------------

### types.ts

Contratos do client HTTP.

------------------------------------------------------------------------

### search-request.ts

Representa o contrato utilizado pelo backend.

``` ts
SearchRequest {
    page,
    size,
    sorts,
    filters
}
```

------------------------------------------------------------------------

### search-mapper.ts

Converte os filtros da tela para o SearchRequest esperado pela API.

Exemplo:

``` ts
{
    name: "Roger",
    email: ""
}
```

↓

``` json
{
  "filters":[
      {
          "field":"name",
          "operator":"LIKE",
          "value":"Roger"
      }
  ]
}
```

Este mapper é compartilhado por todos os módulos.

------------------------------------------------------------------------

# Feature

Cada módulo possui sua própria pasta.

Exemplo:

    features/user

ou

    features/company

------------------------------------------------------------------------

## user.api.ts

Comunicação HTTP.

Responsabilidades:

-   chamar endpoints
-   montar SearchRequest
-   retornar DTOs

Não possui React Query.

Exemplo:

``` ts
userApi.findAll()

userApi.create()

userApi.update()

userApi.delete()
```

------------------------------------------------------------------------

## user.query.ts

Responsável exclusivamente pelos GET.

Utiliza React Query.

Exemplo:

``` ts
useUsers()

useUser()
```

Não contém regras de negócio.

------------------------------------------------------------------------

## user.mutation.ts

Responsável pelas mutações.

Exemplo:

``` ts
useCreateUser()

useUpdateUser()

useDeleteUser()
```

Também realiza:

-   invalidateQueries
-   toast
-   cache

------------------------------------------------------------------------

# Fluxo

Tela

↓

React Query

↓

user.query.ts

↓

user.api.ts

↓

api.client.ts

↓

Next Proxy

↓

Spring Boot

------------------------------------------------------------------------

# Benefícios

-   Separação de responsabilidades.
-   Fetch centralizado.
-   React Query desacoplado da camada HTTP.
-   Reutilização entre módulos.
-   Fácil manutenção.
-   Preparado para autenticação, refresh token e upload.
-   Sem Axios obrigatório.
-   Sem overengineering.

------------------------------------------------------------------------

# Convenções

## API

Toda comunicação deve ocorrer através do client.

Correto:

``` ts
userApi.findById(id)
```

Errado:

``` ts
fetch(...)
```

------------------------------------------------------------------------

## Queries

Somente consultas.

``` ts
useQuery(...)
```

------------------------------------------------------------------------

## Mutations

Somente escrita.

``` ts
useMutation(...)
```

------------------------------------------------------------------------

## Mapper

Toda conversão entre frontend e backend deve ocorrer em mappers.

As telas não devem conhecer o contrato da API.

------------------------------------------------------------------------

# Evolução

Quando o projeto crescer, novos módulos seguem exatamente o mesmo
padrão.

    features/
        company/
        person/
        product/
        order/

Todos reutilizam:

-   api/client.ts
-   search-mapper.ts
-   search-request.ts

Sem duplicação de código.

------------------------------------------------------------------------

# Filosofia

-   Começar simples.
-   Extrair apenas quando necessário.
-   Uma responsabilidade por arquivo.
-   Componentes reutilizáveis.
-   Evitar abstrações prematuras.
-   Escalar por necessidade, não por antecipação.

Essa arquitetura foi pensada para um ERP em Next.js + Spring Boot,
permitindo crescimento gradual sem necessidade de grandes refatorações.
