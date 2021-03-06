from django.utils.translation import ugettext_lazy as _
from jet.dashboard import modules
from jet.dashboard.dashboard import Dashboard, AppIndexDashboard
from jet.dashboard.dashboard_modules import google_analytics

from order.dashboard_modules import RecentTickets,CTR_ChartBar,CTR_Num


class CustomIndexDashboard(Dashboard):
    columns = 3

    def init_with_context(self, context):
        self.available_children.append(google_analytics.GoogleAnalyticsVisitorsTotals)
        self.available_children.append(google_analytics.GoogleAnalyticsVisitorsChart)
        self.available_children.append(google_analytics.GoogleAnalyticsPeriodVisitors)
        self.available_children.append(modules.LinkList)
        self.available_children.append(modules.Feed)
        self.available_children.append(RecentTickets)
        self.available_children.append(CTR_ChartBar)
        self.available_children.append(CTR_Num)
        self.children.append(modules.LinkList(
            _('Support'),
            children=[
                {
                    'title': _('Django documentation'),
                    'url': 'http://docs.djangoproject.com/',
                    'external': True,
                },
                {
                    'title': _('Django "django-users" mailing list'),
                    'url': 'http://groups.google.com/group/django-users',
                    'external': True,
                },
                {
                    'title': _('Django irc channel'),
                    'url': 'irc://irc.freenode.net/django',
                    'external': True,
                },
            ],

        ))
        # append a recent actions module
        self.children.append(modules.RecentActions(
            _('Recent Actions'),
            10,

        ))


class CustomAppIndexDashboard(AppIndexDashboard):
    def init_with_context(self, context):
        self.available_children.append(modules.LinkList)

        self.children.append(modules.ModelList(
            title=_('Application models'),
            models=self.models(),
            column=0,
            order=0
        ))
        self.children.append(modules.RecentActions(
            include_list=self.get_app_content_types(),
            column=1,
            order=0
        ))