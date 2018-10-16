import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../../shared/services/chat.service';
import { Message } from '../../../models/message.model';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';
import { FormGroup } from '@angular/forms';
import { ApiError } from '../../../models/api-error.model';
import { User } from '../../../models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  iconSend = 'https://cdn0.iconfinder.com/data/icons/new-design/512/57-Send-512.png';
  @ViewChild('form') form: FormGroup;
  @ViewChild('containerMessages') containerMessages: ElementRef;
  message: Message = new Message();
  messages: Array<Message>;
  apiError: ApiError;
  meId: string;
  constructor(private chatService: ChatService, private route: ActivatedRoute, private sessionService: SessionService) { }
  
  ngOnInit(){
    
    const container = this.containerMessages.nativeElement;
    container.scrollTop = container.scrollHeight - container.clientHeight;
    
    this.message.from = this.sessionService.user.id; //me
    this.meId = this.message.from; // me
    
    //Params map
    this.route.params.subscribe(params =>{ // ASI O ASI ????   this.route.data.subscribe(data => {});
    this.message.to = params.userId; // him
  });
  
  this.chatService.list(this.message.to).subscribe((messages: Array<Message>) => {
    this.messages = messages;      
  },
  (error: ApiError) => {
    this.apiError = error;
  }
)
}

onClickSubmitMessage(){
  if (this.form.valid) {
    this.chatService.sendMessage(this.message).subscribe((message: Message) => {
      
      console.log(message);
      //NO HAGO NADA AQUI???
    },
    (error: ApiError) => {
      this.apiError = error;
    }
  )
}

}

}
