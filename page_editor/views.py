from django.conf import settings
from django.http import Http404, HttpResponse, HttpResponsePermanentRedirect
from django.shortcuts import get_object_or_404
from django.template import loader
from django.utils.safestring import mark_safe
from django.views.decorators.csrf import csrf_protect
from page_editor.models import *

DEFAULT_TEMPLATE = settings.DEFAULT_TEMPLATE


def flatpage(request, url):
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


@csrf_protect
def render_flatpage(request, f):

    template = loader.get_template(DEFAULT_TEMPLATE)

    f.title = mark_safe(f.title)
    f.content = mark_safe(f.content)

    response = HttpResponse(template.render({'flatpage': f, 'pages': Page.objects.all()}, request))
    return response
