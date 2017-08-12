# -*- coding: UTF-8 -*-
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings
from constance import config
import urllib
import urllib.parse
import urllib.request


def sendEmailViaTemplate(name, phone, text):
    for_render = {'name': name, 'phone': phone, 'text': text}

    template = render_to_string(settings.PATH_EMAIL_TEMPLATE + '/' + settings.EMAIL_TEMPLATE_NAME, for_render)

    subject = "У вас новый заказ!"
    if config.SEND_TO_EMAIL:
        msg = EmailMessage(subject, template, settings.EMAIL_HOST_USER, [config.EMAIL_NOTIFICATION])
        msg.content_subtype = "html"
        msg.send()


def sendSMS(name, phone):
    msg = 'У вас новый заказ!\n' + name + '\n' + phone
    d = {
        'http_username': settings.SMS_USERNAME,
        'http_password': settings.SMS_PASSWORD,
        'message': msg.encode('cp1251'),
        'phone_list': config.PHONE_NOTIFICATION,
    }
    params = urllib.parse.urlencode(d)
    response = urllib.request.urlopen('%s?%s' % ('http://websms.ru/http_in5.asp', params,))
    try:
        if response.getcode() != 200:
            print(response, response.getcode(), response.info())
            return False
    except Exception as err:
        print('Falied send SMS: %s' % err)
        return False
    return True
