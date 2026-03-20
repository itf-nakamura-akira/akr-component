# @akr506/akr-component

[English](./README.md) | [日本語](./README.ja.md) | [简体中文](./README.zh.md) | [한국어](./README.ko.md) | [Deutsch](./README.de.md) | [Français](./README.fr.md) | [हिन्दी](./README.hi.md)

आधुनिक एंगुलर (Angular) अनुप्रयोगों के लिए हल्के, सुलभ और स्टैंडअलोन UI घटकों का एक संग्रह।

## 🚀 विशेषताएं

- **Angular v21 Ready**: नवीनतम एंगुलर सुविधाओं के साथ निर्मित।
- **स्टैंडअलोन घटक (Standalone Components)**: किसी NgModule की आवश्यकता नहीं, आयात और उपयोग करना आसान।
- **हल्का और तेज़**: इष्टतम प्रदर्शन के लिए न्यूनतम निर्भरता (dependencies)।
- **पूरी तरह से सुलभ**: सुलभता (accessibility) को ध्यान में रखते हुए डिज़ाइन किया गया (`@angular/aria` का उपयोग करके)।

## 📦 स्थापना

npm के माध्यम से पैकेज स्थापित करें:

```bash
npm install @akr506/akr-component
```

## 🛠 उपयोग

बस उन घटकों को सीधे अपने स्टैंडअलोन घटक में आयात करें जिनकी आपको आवश्यकता है। ध्यान दें कि कुछ घटक, जैसे बटन, विशेषता (attributes) के रूप में उपयोग किए जाते हैं:

```typescript
import { AkrAlert, AkrButton } from '@akr506/akr-component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AkrButton, AkrAlert],
    template: `
        <akr-alert severity="success">AKR Components में आपका स्वागत है!</akr-alert>
        <button akr-button (click)="onHandleClick()">मुझे क्लिक करें</button>
    `,
})
export class AppComponent {
    onHandleClick() {
        console.log('बटन क्लिक किया गया!');
    }
}
```

### स्टाइल्स (Styles)

अपने `angular.json` या `styles.css` में लाइब्रेरी स्टाइल शामिल करना न भूलें:

```css
@import '@akr506/akr-component/styles.css';
```

## 🧱 घटक

- **Alert**: कई प्रकार के सूचनात्मक संदेश।
- **Button**: विभिन्न शैलियों के साथ बहुमुखी बटन घटक।
- **Form Field**: लेबल और त्रुटि समर्थन के साथ फॉर्म तत्वों के लिए कंटेनर।
- **Input**: उन्नत टेक्स्ट इनपुट फ़ील्ड।
- **Navigation Tree**: पदानुक्रमित डेटा विज़ुअलाइज़ेशन।
- **Radio Button**: कस्टम रेडियो बटन और समूह।

## 📄 लाइसेंस

MIT © [Nakamura Akira](mailto:nakamura.akira@itfllc.co.jp)

## 📛 नाम की उत्पत्ति

जबकि "AKR" आधिकारिक तौर पर **Angular Kernel Resources** के लिए खड़ा है (हो सकता है कि आप अपने बॉस के लिए इसका उपयोग करना चाहें), इसकी वास्तविक उत्पत्ति डेवलपर के नाम से ली गई है।
