import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ChatService } from '../../../shared/services/chat.service';
import { Message } from '../../../models/message.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';
import { FormGroup } from '@angular/forms';
import { ApiError } from '../../../models/api-error.model';
import { User } from '../../../models/user.model';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit, OnDestroy {
  private static readonly POLLING_INTERVAL = 500;
  @ViewChild('form') form: FormGroup;
  @ViewChild('containerMessages') containerMessages: ElementRef;
  iconSend = 'https://cdn0.iconfinder.com/data/icons/new-design/512/57-Send-512.png';
  message: Message = new Message();
  messages: Array<Message>;
  apiError: ApiError;
  intervalPollingSubscription: Subscription;
  meId: string;
  constructor(private chatService: ChatService, private route: ActivatedRoute, private sessionService: SessionService, private router: Router) { }
  
  ngOnInit(){
    
    //ESTO NO TIRA???
    // let container = this.containerMessages.nativeElement;
    // container.scrollTop = container.scrollHeight - container.clientHeight;
    
    this.message.from = this.sessionService.user.id; //me
    this.meId = this.message.from; // me
    
    //Params map ME SIGUE DANDO ERROR A VECES DE _ID EN CHAT LIST CONTROLLER????
    this.route.params.subscribe(params =>{
      this.message.to = params.userId; // him
    });  
    
    // PORQUE ME MUESTRA EL NUEVO SIN SIQUIERA NOTIFICAR CAMBIOS => PORQUE YA LOS TIENE!!!
    // this.chatService.list(this.message.to).subscribe((messages: Array<Message>) => {
    //   console.log(1, messages);
    //   this.messages = messages;
    // })
    
    
    //INTERVAL NO HACE FALTA NOTIFICAR CAMBIOS EN SERVICIOS => PORQUE YA RECARGA LA PAGINA DIRECTAMENTE!!!
    this.intervalPollingSubscription = interval(ChatListComponent.POLLING_INTERVAL)
    .pipe(
      startWith(0),
      switchMap(() => this.chatService.list(this.message.to))
    ).subscribe(
      (messages: Array<Message>) => {
        this.messages = messages;     
      },
      (error: ApiError)=> {
        this.apiError = error;
      }
    );
  }
  
  
  
  onClickSubmitMessage(){
    if (this.form.valid) {    
      this.chatService.sendMessage(this.message).subscribe((message: Message) => {    
        //NO HAGO NADA AQUI?????
        this.containerMessages.nativeElement.scrollTop = this.containerMessages.nativeElement.scrollHeight; 

        // this.containerMessages.nativeElement.scrollTop = this.containerMessages.nativeElement.scrollHeight; //SCROLLTOP VA MAL AQUI ??????????????
        //PONER MAPAS INFO WINDOW https://stackoverflow.com/questions/39739508/how-could-i-call-a-angular2-function-from-a-google-map-infowindow ?????????????
        this.form.reset();
      },
      (error: ApiError) => {
        this.apiError = error;
      }
    )
  }
}

ngOnDestroy(){
  this.intervalPollingSubscription.unsubscribe();
}

}



