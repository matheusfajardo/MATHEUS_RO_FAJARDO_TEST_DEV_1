// import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { isArray } from 'util';
// import { NotificationService } from './notification.service';

// // Mensagem de erro genérica para erros ocorridos em requisições do servidor
// const GENERIC_ERROR_MESSAGE = 'Ocorreu um erro eo enviar a requisição';

// /**
//  * Define as opções para a requisição Http para a classe HttpClient
//  */
// export interface IAppRequestOptions {
//   headers?: {
//     [header: string]: string | string[];
//   };
//   observe?: 'body';
//   params?: {
//     [param: string]: any | string[];
//   };
//   reportProgress?: boolean;
//   responseType?: 'json' | 'text' | 'blob';
//   withCredentials?: boolean;
//   displayErrorMessage?: boolean;
//   errorMessage?: string;
// }

// /**
//  * Define as opções para a requisição Http nativas do angular
//  */
// export interface IBaseRequestOptions {
//   headers?: HttpHeaders | {
//     [header: string]: string | string[];
//   };
//   observe?: 'body';
//   params?: HttpParams | {
//     [param: string]: string | string[];
//   };
//   reportProgress?: boolean;
//   responseType?: 'json';
//   withCredentials?: true;
// }

// // Função factory para criação do serviço
// export function applicationHttpClientCreator(http: HttpClient, notificationService: NotificationService) {
//   return new ApplicationHttpClient(http, notificationService);
// }

// /**
//  * Classe base para criação de serviços para acesso a API do AWSGE
//  */
// export class ApplicationHttpClient {

//   private _notificationsDisabled = false;

//   /**
//    * Obtém a URL de acordo com o ambiente (Desenvolvimento, Teste, Produção, Desenvolvimento)
//    */
//   private baseUrl = environment.urlAPI;

//   constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }

//   /**
//    * Desabilita as notificações para todos os endpoints
//    */
//   set notificationsDisabled(value: boolean) {
//     this._notificationsDisabled = value;
//   }

//   /**
//    * Monta a url concatenando o endereço base e o nome do controller na API
//    * @param controllerName Nome do controllerna API
//    */
//   getUrlWithController(controllerName: string) {
//     return `/API/${controllerName}`;
//   }

//   /**
//    * Monta a url concatenando o endereço base com o nome do controller e o nome da action na API
//    * @param controllerName Nome do controller na API
//    * @param actionName Nome da action na API
//    */
//   getUrlWithControllerAndAction(controllerName: string, actionName: string) {
//     return `/API/${controllerName}/${actionName}`;
//   }

//   /**
//    * Monta a url com o nome do controller e um id de registro
//    * @param controllerName Nome do controller na API
//    * @param idValue Valor do id do registro
//    */
//   getUrlWithControllerAndId(controllerName: string, idValue: number) {
//     return `/API/${controllerName}/${idValue}`;
//   }

//   /**
//    * Monta uma URL completa com endereço base, nome de controller e action na API e id do registro
//    * @param controllerName Nome do controller na API
//    * @param actionName Nome da action na API
//    * @param idValue Valor do id do registro
//    */
//   getUrlWithControllerAndActionAndId(controllerName: string, actionName: string, idValue: number) {
//     return `/API/${controllerName}/${actionName}/${idValue}`;
//   }

//   /**
//    * Requisição GET
//    * @param {string} endPoint Caminho do endpoint na API
//    * @param {IAppRequestOptions} options Opções da requisição como headers, body, etc.
//    * @returns {Observable<T>}
//    */
//   public get<T>(endPoint: string, options?: IAppRequestOptions): Observable<T> {

//     return this.criarPipelineRequisicao(
//       this.httpClient.get<T>(this.baseUrl + endPoint, this.configurarRequestOptions(options)),
//       options);
//   }

//   /**
//    * Requisição POST
//    * @param {string} endPoint Caminho do endpoint na API
//    * @param {Object} params body of the request.
//    * @param {IAppRequestOptions} options Opções da requisição como headers, body, etc.
//    * @returns {Observable<T>}
//    */
//   public post<T>(endPoint: string, params: Object, options?: IAppRequestOptions): Observable<T> {

//     return this.criarPipelineRequisicao(
//       this.httpClient.post<T>(this.baseUrl + endPoint, params, this.configurarRequestOptions(options)),
//       options);
//   }

//   /**
//    * Requisição PUT
//    * @param {string} endPoint Caminho do endpoint na API
//    * @param {Object} params body of the request.
//    * @param {IAppRequestOptions} options Opções da requisição como headers, body, etc.
//    * @returns {Observable<T>}
//    */
//   public put<T>(endPoint: string, params: Object, options?: IAppRequestOptions): Observable<T> {

//     return this.criarPipelineRequisicao(
//       this.httpClient.put<T>(this.baseUrl + endPoint, params, this.configurarRequestOptions(options)),
//       options);
//   }

//   /**
//    * Requisição DELETE
//    * @param {string} endPoint Caminho do endpoint na API
//    * @param {IAppRequestOptions} options Opções da requisição como headers, body, etc.
//    * @returns {Observable<T>}
//    */
//   public delete<T>(endPoint: string, options?: IAppRequestOptions): Observable<T> {

//     return this.criarPipelineRequisicao(
//       this.httpClient.delete<T>(this.baseUrl + endPoint, this.configurarRequestOptions(options)),
//       options);
//   }

//   /**
//    * Recebe um objeto de configurações do tipo IAppRequestOptions, que é um tipo de opções de requisição customizado
//    * para a aplicação e retornaum objeto do tipo IBaseRequestOptions que é o formato aceito pelo objset HttpRequest
//    * nativo do angular
//    * @param options Objeto com configurações da requisição do tipo IAppRequestOptions
//    */
//   private configurarRequestOptions(options: IAppRequestOptions): IBaseRequestOptions {
//     let params = new HttpParams();
//     let headers = new HttpHeaders();

//     if (!options) {
//       options = {} as IAppRequestOptions;
//     }

//     // Varre o conjunto de headers passados no formato de IRequestOptions e traduz para o formato HttpHeaders
//     // utilizado
//     if (options.headers) {
//       Object.keys(options.headers).forEach(key => {
//         headers = headers.append(key, `${options.headers[key]}`);
//       });
//     }

//     // Varre o conjunto de params passados no formato de IRequestOptions e traduz para o formato HttpHeaders
//     // utilizado
//     if (options.params) {
//       Object.keys(options.params).forEach(key => {
//         params = params.append(key, `${options.params[key]}`);
//       });
//     }

//     // // Verifica se o token do usuário está armazenado no local storage e
//     // // vincula a requisição
//     // const token = localStorage.getItem(SGE_TOKEN_KEY);
//     // if (token) {
//     //   headers = headers.append(SGE_TOKEN_KEY, token);
//     // }

//     // Retorna o objeto IBaseRequestOptions com os parâmetros e cabeçalhos ajustados e caso o usuário não tenha setado explicitamente
//     // o valor de withCredentials para false, ele será setado como true.
//     return { ...options, ...{ params, headers, withCredentials: options.withCredentials === false ? false : true } } as IBaseRequestOptions;
//   }

//   /**
//    *
//    * @param requisicao$
//    * @param opcoes
//    */
//   private criarPipelineRequisicao(requisicao$: Observable<any>, opcoes: IAppRequestOptions) {

//     return requisicao$.pipe(
//       tap(resposta => {
//         if (resposta && resposta.success && resposta.data.successMessage) {
//           this.notificationService.notifySuccess(resposta.data.successMessage)
//         }
//       }),
//       catchError(error => {
//         let mensagemErro = GENERIC_ERROR_MESSAGE;
//         if (opcoes && opcoes.errorMessage) {
//           // Atribui a mensagem de erro passada nas opções da requisição
//           mensagemErro = opcoes.errorMessage;
//         }

//         if (error instanceof HttpErrorResponse) {
//           const httpResponseError = <HttpErrorResponse>error;
//           if (httpResponseError.error) {
//             if (httpResponseError.error['exceptionMessage']) {
//               // Imprime a mensagem da exceção contida no servidor no console
//               console.log(`Ocorreu a seguinte exceção durante o tratamento da requisição pelo servidor: ${httpResponseError.error['exceptionMessage']}`);
//             }

//             if ((!opcoes || !opcoes.errorMessage) && httpResponseError.error['errors'] && isArray(httpResponseError.error['errors'])
//               && httpResponseError.error['errors'].length) {
//               // Atribui a mensagem de erro passada pelo servidor
//               mensagemErro = httpResponseError.error['errors'].join('\n');
//             }
//           }
//         }

//         // Emite uma notificação para o erro caso esta opção não tenha sido desabilitada
//         if (!this._notificationsDisabled && (!opcoes || opcoes.displayErrorMessage !== false)) {
//           this.notificationService.notifyError(mensagemErro);
//         }

//         return throwError(mensagemErro);
//       })
//     );
//   }
// }
