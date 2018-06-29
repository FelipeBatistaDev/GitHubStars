import { Injectable } from '@angular/core';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { request, GraphQLClient  } from 'graphql-request'
import { Http,Headers } from '@angular/http'




@Injectable({
  providedIn: 'root'
})
export class AcessoAPIService {

  constructor( apollo: Apollo,
   httpLink: HttpLink,
  private http: Http) {    }


  // método que consulta a api com graphql
public busca(usuario: string): Promise<any>{
  const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      Authorization: 'bearer 4061e46ac438f61caed5f8e56c69ef99490f377c',
    },
  })
   
  const query = `{
    user(login: "${usuario}"){
      name
      login
      bio
      location
      email
      websiteUrl
      avatarUrl
      starredRepositories(first: 10) {
        edges {
          node {
           nameWithOwner
            description
            watchers{
              totalCount
            }
          }
        }
      }
      
    }
  }`

  
return client.request(query).then((data: any) => data)
  
}

//método que põe repositório na lista de estrelados do FelipeBatistaDev
public star(repositorio: string): Promise<any>{
  //token do meu usuario
  const headers = new Headers({'Authorization': 'bearer 4061e46ac438f61caed5f8e56c69ef99490f377c'});

  return this.http.put(`https://api.github.com/user/starred/${repositorio}`, null,{
    headers: headers
   }).toPromise().then(data => console.log(data))
}




}
