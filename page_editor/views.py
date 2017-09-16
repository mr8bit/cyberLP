from django.conf import settings
from django.http import Http404, HttpResponse, HttpResponsePermanentRedirect
from django.shortcuts import get_object_or_404
from django.template import Context, Template
from django.template import loader
from django.utils.safestring import mark_safe
from django.views.decorators.csrf import csrf_protect

from page_editor.models import *

DEFAULT_TEMPLATE = settings.DEFAULT_TEMPLATE

from constance import config


def item(request, url, slug):
    if not url.startswith('/'):
        url = '/' + url
    try:
        f = get_object_or_404(Page, url=url)
    except Http404:
        if not url.endswith('/') and settings.APPEND_SLASH:
            url += '/'
            f = get_object_or_404(Page, url=url)
            return HttpResponsePermanentRedirect('%s/' % request.path)
        else:
            raise
    if f.dynamic:
        tem = Template(f.html_render)
        con = Context({'pages': Page.objects.all(),
                       'news': Article.objects.all(),
                       'article': Article.objects.get(slug=slug),
                       'meta': f.as_meta(request),
                       })
        menu_html = tem.render(con)
        f.title = mark_safe(Article.objects.get(slug=slug).title)
        f.content = mark_safe(menu_html)

    template = loader.get_template(DEFAULT_TEMPLATE)
    response = HttpResponse(template.render(
        {'flatpage': f,
         'NAME_SITE': config.NAME_SITE,
         'PHONE': config.PHONE,
         'PHONE_ADDITION': config.PHONE_ADDITION,
         'EMAIL': config.EMAIL,
         'COMPANY_NAME': config.COMPANY_NAME,
         'pages': Page.objects.all().filter(show_in_menu=True),
         'news': Article.objects.all(),
         'meta': f.as_meta(request),
         }, request))
    return response


def flatpage(request, url, slug=''):
    print(slug)
    if not url.startswith('/'):
        url = '/' + url
    try:
        f = get_object_or_404(Page, url=url)
    except Http404:
        if not url.endswith('/') and settings.APPEND_SLASH:
            url += '/'
            f = get_object_or_404(Page, url=url)
            return HttpResponsePermanentRedirect('%s/' % request.path)
        else:
            raise
    return render_flatpage(request, f)


from news.models import *


@csrf_protect
def render_flatpage(request, f):
    template = loader.get_template(DEFAULT_TEMPLATE)
    if f.dynamic and not f.static:
        tem = Template(f.html_render)
        con = Context({'pages': Page.objects.all(),
                       'news': Article.objects.all()
                       })
        menu_html = tem.render(con)
        f.content = menu_html
    if f.dynamic and f.static:
        tem = Template(f.html_render)
        con = Context({'pages': Page.objects.all(),
                       'news': Article.objects.all()
                       })
        menu_html = tem.render(con)
        f.content += menu_html
    # You can print html content using "html" method of HtmlNodeList object
    f.title = mark_safe(f.title)
    f.content = mark_safe(f.content)
    response = HttpResponse(template.render(
        {
            'meta': f.as_meta(request),
            'flatpage': f,
            'NAME_SITE': config.NAME_SITE,
            'PHONE': config.PHONE,
            'PHONE_ADDITION': config.PHONE_ADDITION,
            'EMAIL': config.EMAIL,
            'COMPANY_NAME': config.COMPANY_NAME,
            'pages': Page.objects.all(),
            'news': Article.objects.all(),
        }, request))
    return response


def get_snippet(request):
    template = loader.get_template(settings.SNIPPET_TEMPLATE)
    response = HttpResponse(template.render(
        {'NAME_SITE': config.NAME_SITE,
         'PHONE': config.PHONE,
         'PHONE_ADDITION': config.PHONE_ADDITION,
         'EMAIL': config.EMAIL,
         'COMPANY_NAME': config.COMPANY_NAME,
         'pages': Page.objects.all(),
         'news': Article.objects.all(),
         }, request))
    return response
