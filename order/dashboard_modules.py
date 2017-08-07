from jet.dashboard.modules import DashboardModule
from order.models import Order, Status
from django.utils.translation import ugettext_lazy as _


class RecentTickets(DashboardModule):
    title = 'Последние заказы'
    template = 'order/dashboard_modules/recent_tickets.html'
    limit = 5

    def init_with_context(self, context):
        self.children = Order.objects.all()[:self.limit]


from jet.dashboard.dashboard_modules.google_analytics import GoogleAnalyticsPeriodVisitors, GoogleAnalyticsBase, \
    GoogleAnalyticsPeriodVisitorsSettingsForm


class CTR_ChartBar(GoogleAnalyticsBase):
    title = 'CTR Chart Bar'
    template = 'order/dashboard_modules/ctr_chart_bar.html'

    #: Which period should be displayed. Allowed values - integer of days
    period = None

    def __init__(self, title=None, period=None, **kwargs):
        kwargs.update({'period': period})
        super(CTR_ChartBar, self).__init__(title, **kwargs)

    def init_with_context(self, context):
        result = self.api_ga()
        ctr_object = {}
        for status in Status.objects.all():
            ctr_object[status.name] = Order.objects.filter(status=status.id).count()

        if result is not None:
            try:
                self.children.append({'title': "Пользователей", 'value': result['totalsForAllResults']['ga:users']})
                for status in Status.objects.all():
                    self.children.append({'title': status.name, 'value': ctr_object[status.name]})
            except KeyError:
                self.error = _('Bad server response')


class CTR_ChartFunnel(GoogleAnalyticsBase):
    title = 'CTR Chart Funnel'
    template = 'order/dashboard_modules/ctr_chart_funnel.html'

    #: Which period should be displayed. Allowed values - integer of days
    period = None

    def __init__(self, title=None, period=None, **kwargs):
        kwargs.update({'period': period})
        super(CTR_ChartFunnel, self).__init__(title, **kwargs)

    def init_with_context(self, context):
        result = self.api_ga()
        ctr_object = {}
        for status in Status.objects.all():
            ctr_object[status.name] = Order.objects.filter(status=status.id).count()

        if result is not None:
            try:
                self.children.append({'title': "Пользователей", 'value': result['totalsForAllResults']['ga:users'], 'color': '#00AEFF'})
                for status in Status.objects.all():
                    self.children.append({'title': status.name, 'value': ctr_object[status.name],'color': status.color})
            except KeyError:
                self.error = _('Bad server response')


class CTR_Num(GoogleAnalyticsBase):
    title = 'CTR Num'
    template = 'order/dashboard_modules/ctr_num.html'

    #: Which period should be displayed. Allowed values - integer of days
    period = None

    def __init__(self, title=None, period=None, **kwargs):
        kwargs.update({'period': period})
        super(CTR_Num, self).__init__(title, **kwargs)

    def init_with_context(self, context):
        result = self.api_ga()
        ctr_object = {}
        ctr_object = Order.objects.filter(status__name='Завершено').count()

        if result is not None:
            try:
                if ( float(result['totalsForAllResults']['ga:users'])):

                    self.children.append(
                        {'value': round(float(ctr_object / float(result['totalsForAllResults']['ga:users'])), 3)})
                else:
                    self.children.append(
                        {'value': "Нет данных"})
            except KeyError:
                self.error = _('Bad server response')
