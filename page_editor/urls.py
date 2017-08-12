from django.conf.urls import url
from page_editor import views

urlpatterns = [
    url(r'^(?P<url>.*)$', views.flatpage, name='page_editor.page'),
]