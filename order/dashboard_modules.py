from django.utils.translation import ugettext_lazy as _
from jet.dashboard.modules import DashboardModule
from jet.dashboard.dashboard_modules.google_analytics import GoogleAnalyticsBase
from order.models import Order, Status


class RecentTickets(DashboardModule):
    title = 'Последние заказы'
    template = 'order/dashboard_modules/recent_tickets.html'
    limit = 5

    def init_with_context(self, context):
        self.children = Order.objects.all()[:self.limit]




class CTR_ChartBar(GoogleAnalyticsBase):
    title = "Воронка продаж"
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
            ctr_object[status.name] = Order.objects.filter(status=status.id,creation_date__range=[result['query']['start-date'],
                                                                                          result['query'][
                                                                                              'end-date']]).count()

        if result is not None:
            try:

                self.children.append({'title': "Пользователей", 'value': result['totalsForAllResults']['ga:users']})
                for status in Status.objects.all():
                    self.children.append({'title': status.name, 'value': ctr_object[status.name]})
            except KeyError:
                self.error = _('Bad server response')


class CTR_Num(GoogleAnalyticsBase):
    title = 'Просмотры/Заказы'
    template = 'order/dashboard_modules/ctr_num.html'

    #: Which period should be displayed. Allowed values - integer of days
    period = None

    def __init__(self, title=None, period=None, **kwargs):
        kwargs.update({'period': period})
        super(CTR_Num, self).__init__(title, **kwargs)

    def init_with_context(self, context):
        result = self.api_ga()
        ctr_object = {}
        ctr_object = Order.objects.filter(status__name='Завершено', creation_date__range=[result['query']['start-date'],
                                                                                          result['query'][
                                                                                              'end-date']]).count()
        if result is not None:
            try:
                if (float(result['totalsForAllResults']['ga:users'])):

                    self.children.append(
                        {'value': round(float(ctr_object / float(result['totalsForAllResults']['ga:users'])) * 100, 2)})
                else:
                    self.children.append(
                        {'value': "Нет данных"})
            except KeyError:
                self.error = _('Bad server response')
