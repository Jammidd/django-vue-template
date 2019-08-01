"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),

    # User management
    url(r'^users/', include(('{{ cookiecutter.project_slug }}.users.urls', 'users'), namespace='users')),
    url(r'^accounts/', include('allauth.urls')),{% if cookiecutter.use_drf_registration == 'y' %}
    url(
        regex=r'^rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$',
        view=confirm_email,
        name="account_confirm_email"
    ),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),{% endif %}
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
