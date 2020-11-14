import qs from 'qs';
import { Linking } from 'react-native';


export async function sendEmail(to, subject, body, option = {}) {

    const {email, phone} = option;
    let url = `mailto:${to}`;


    body += `\n\nmail: ${email}`

    if (phone) {
        body += `\nTelephone: ${phone}`
    }
    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body
    });

    if (query.length) {
        url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}