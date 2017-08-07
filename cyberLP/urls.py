from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from page_editor.sites import site as page_site
from rest_framework import routers
from order.api import views as api
from django.views.generic import TemplateView
from jet.dashboard.dashboard_modules import google_analytics_views

router = routers.DefaultRouter()
router.register(r'statusboard', api.StatusViewSet)
router.register(r'orders', api.OrderViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),  # Django JET dashboard URLS
    url(r'^jet/', include('jet.urls', 'jet')),
    url(r'^admin/', admin.site.urls),
    url(r'^admin/order_pages/', TemplateView.as_view(template_name='admin/orders.html')),
    url(r'^admin/page_editor/', include(page_site.urls)),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
