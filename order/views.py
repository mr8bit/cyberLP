from django.contrib.auth.views import login
from django.template.response import TemplateResponse
from django.http import HttpResponseRedirect


# Create your views here.
def orders(request):
    if request.user.is_authenticated and request.user.is_staff:
        context = {}
        context['site_url'] = '/'
        response = TemplateResponse(request, "admin/orders.html", context)
        response.set_cookie('user_id', request.user.id)
        return response
    else:
        return HttpResponseRedirect("/admin/login/?next=/admin/")
