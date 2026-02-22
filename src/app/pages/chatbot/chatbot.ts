import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatbotGeminiService, ChatMessage } from '../../services/chatbot-gemini.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  messages: ChatMessage[] = [];
  userInput: string = '';
  isTyping: boolean = false;
  showMobileMenu: boolean = false;
  isAIMode: boolean = false;
  isDarkMode: boolean = false;

  constructor(private chatbotService: ChatbotGeminiService) {}

  ngOnInit() {
    this.isAIMode = this.chatbotService.isAIInitialized();
    
    this.addBotMessage({ 
      answer: 'Halo! Saya EduAssist, asisten virtual kampus Anda. 🎓\n\nSaya bisa membantu Anda menjawab pertanyaan tentang:\n\n📚 Jadwal Kuliah\n📝 KRS & IRS\n📊 Nilai & Transkrip\n🎓 Skripsi & PKL\n💰 UKT & Pembayaran\n💳 KTM\n🔑 Password\n🎓 Beasiswa\n📚 Perpustakaan\n🔄 Pengajuan Cuti\n\nKetik pertanyaan Anda atau pilih topik di atas!',
      quickReplies: [
        { label: '📅 Jadwal Kuliah', action: 'jadwal' },
        { label: '📝 Panduan KRS', action: 'krs' },
        { label: '📊 Nilai Saya', action: 'nilai' },
        { label: '💰 UKT', action: 'ukt' },
        { label: '🔄 Cuti Kuliah', action: 'cuti' },
        { label: '❓ FAQ', action: 'faq' }
      ]
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    this.addUserMessage(this.userInput);
    const userMessage = this.userInput;
    this.userInput = '';
    this.isTyping = true;

    try {
      const response = await this.chatbotService.sendMessage(userMessage);
      this.isTyping = false;
      this.addBotMessage({ answer: response.answer });
    } catch (error) {
      this.isTyping = false;
      this.addBotMessage({ answer: 'Maaf, terjadi kesalahan. Silakan coba lagi.' });
    }
  }

  async onQuickReply(action: string) {
    const quickReplyLabels: { [key: string]: string } = {
      'jadwal': '📅 Jadwal Kuliah',
      'krs': '📝 Panduan KRS',
      'nilai': '📊 Nilai Saya',
      'ukt': '💰 UKT',
      'faq': '❓ FAQ',
      'skripsi': '📜 Skripsi',
      'cuti': '🔄 Cuti Kuliah',
      'ktm': '💳 KTM',
      'password': '🔑 Password',
      'beasiswa': '🎓 Beasiswa',
      'perpustakaan': '📚 Perpustakaan',
      'menu': '🏠 Menu Utama'
    };
    
    this.addUserMessage(quickReplyLabels[action] || action);
    this.isTyping = true;

    try {
      const response = await this.chatbotService.sendMessage(action);
      this.isTyping = false;
      this.addBotMessage({ answer: response.answer });
    } catch (error) {
      this.isTyping = false;
      this.addBotMessage({ answer: 'Maaf, terjadi kesalahan. Silakan coba lagi.' });
    }
  }

  addUserMessage(text: string) {
    const message: ChatMessage = {
      id: this.messages.length,
      text: text,
      isUser: true,
      timestamp: new Date()
    };
    this.messages.push(message);
  }

  addBotMessage(response: { answer: string; quickReplies?: any[] }) {
    const message: ChatMessage = {
      id: this.messages.length,
      text: response.answer,
      isUser: false,
      timestamp: new Date()
    };
    this.messages.push(message);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  getCleanText(message: ChatMessage): string {
    return message.text;
  }

  formatText(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>')
      .replace(/📚|📅|📝|📊|🔹|🔄|💡|⚠️|🏢|👨‍🏫|🖥️|📋|💳|🎓|💼|📜|📂|🎉|❓|🔑|👤|📄|✅|🕐|💰|🏠/g, '<span class="emoji">$&</span>');
  }
}
