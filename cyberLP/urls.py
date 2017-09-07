from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework import routers
from jet.dashboard.dashboard_modules import google_analytics_views
from order import views as order
from order.api import views as api
from page_editor.sites import site as page_site

router = routers.DefaultRouter()
router.register(r'statusboard', api.StatusViewSet)
router.register(r'status', api.StatusNameViewSet)
router.register(r'comment', api.CommentViewSet)
router.register(r'commentfiles', api.CommentFilesViewSet)
router.register(r'orders', api.OrderViewSet)
router.register(r'task', api.TaskViewSet)
router.register(r'todo', api.TodoViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),  # Django JET dashboard URLS
    url(r'^jet/', include('jet.urls', 'jet')),
    url(r'^admin/', admin.site.urls),
    url(r'^admin/order_pages/', order.orders),
    url(r'^admin/page_editor/', include(page_site.urls)),
    url(r'^', include('page_editor.urls')),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
