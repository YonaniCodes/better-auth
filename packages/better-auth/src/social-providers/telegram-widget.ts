// packages/better-auth/src/social-providers/telegram-widget.ts  
export interface TelegramWidgetConfig {  
	botUsername: string;  
	buttonSize?: 'large' | 'medium' | 'small';  
	cornerRadius?: number;  
	requestAccess?: 'write';  
	usePic?: boolean;  
	callbackUrl: string;  
}  
  
export function createTelegramWidget(config: TelegramWidgetConfig): string {  
	const {  
		botUsername,  
		buttonSize = 'large',  
		cornerRadius = 20,  
		requestAccess,  
		usePic = true,  
		callbackUrl  
	} = config;  
	  
	const attributes = [  
		`data-telegram-login="${botUsername}"`,  
		`data-size="${buttonSize}"`,  
		`data-auth-url="${callbackUrl}"`,  
		cornerRadius !== 20 ? `data-radius="${cornerRadius}"` : '',  
		requestAccess ? `data-request-access="${requestAccess}"` : '',  
		!usePic ? 'data-userpic="false"' : '',  
	].filter(Boolean).join(' ');  
	  
	return `<script async src="https://telegram.org/js/telegram-widget.js?22" ${attributes}></script>`;  
}