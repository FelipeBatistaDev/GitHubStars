import { Component, OnInit } from '@angular/core';
import {AcessoAPIService} from '../servicos/acesso-api.service'
import { UsuarioModel } from '../usuario.model'
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  public usuarioPesquisado: any;

  //esconder e exibir itens na tela
  public buscador: boolean = true;
  public perfil: boolean = false;
  public quadro: boolean = false;
  public naoAchou: boolean = false;
  public menuSuperior: boolean = false;

  //variaveis para exibição dinamica
  public nome: string
  public email: string
  public location: string
  public urlFoto: string
  public urlSite: string
  public login: string
  public desc: string
  public repositoriosEstrela: String[]

  // acesso a API
  constructor(private acessoAPI: AcessoAPIService) { }

  ngOnInit() {
  }


  //método para resgatar o usuário digitado
  getUser(usuario: Event){
      this.usuarioPesquisado = (<HTMLInputElement>usuario.target).value;
      console.log(this.usuarioPesquisado);
  }

  //Busca e preenche os dados com o retorno da API
  enviaBusca(){
    this.acessoAPI.busca(this.usuarioPesquisado).then(data=>{
      this.nome = data.user.name;
      this.login = data.user.login;
      this.desc = data.user.bio;
      this.location = data.user.location;
      this.email = data.user.email;
      this.urlSite = data.user.websiteUrl;
      this.urlFoto = data.user.avatarUrl;
      this.repositoriosEstrela = data.user.starredRepositories.edges;

      this.perfil = true
      this.quadro = true
      this.buscador = false
      this.menuSuperior = true;
      this.naoAchou = false;

      
    },error =>{
// Caso de erro exibe mensagem de usuario não encontrado
      this.menuSuperior = true;
      this.naoAchou = true;
      this.buscador = false;
      this.perfil = false;
      this.quadro = false;

    });

  }

  // Adiciona repositorio a lista de starRepo do FelipeBatistaDev
  star(repositorio: string){
    this.acessoAPI.star(repositorio);

  }

}
