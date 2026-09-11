from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView, RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('djangoapp/', include('djangoapp.urls')),
    path('', RedirectView.as_view(url='/dealers/')),
    path('dealers/', TemplateView.as_view(template_name="index.html")),
    path('dealer/<int:id>', TemplateView.as_view(template_name="index.html")),
    path('postreview/<int:id>', TemplateView.as_view(template_name="index.html")),
    path('login/', TemplateView.as_view(template_name="index.html")),
    path('register/', TemplateView.as_view(template_name="index.html")),
]
