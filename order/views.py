from django.template.response import TemplateResponse
from django.http import HttpResponse
from django.template import RequestContext


# Create your views here.
def orders(request):
    context = {}
    response = TemplateResponse(request, "admin/orders.html", context)
    response.set_cookie('user_id', request.user.id)
    return response
