from django.shortcuts import render

import os

import json

from django.conf import settings
from django.contrib.auth.decorators import user_passes_test
from django.http import HttpResponse, Http404
from django.shortcuts import render


is_staff = user_passes_test(lambda u: u.is_staff, login_url='admin:login')


@is_staff
def index(request):
    return render(request, 'grappelli_te/orders.html')

