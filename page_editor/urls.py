from django.conf.urls import url
from page_editor import views

urlpatterns = [
    url(r'^js/get_snippets$', views.get_snippet, name='page_editor.snippet'),
    url(r'^(?P<url>.*)$', views.flatpage, name='page_editor.page'),

]