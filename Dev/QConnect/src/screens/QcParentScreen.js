import Analytics from '@aws-amplify/analytics';
import analyticsEvents from 'config/analyticsEvents'
import FontLoadingComponent from 'components/FontLoadingComponent';

class QcParentScreen extends FontLoadingComponent {

    async componentDidMount() {
        super.componentDidMount();

        Analytics.record({
            name: analyticsEvents.screen_loaded,
            attributes: { screen: this.name }
        })
    }
}

export default QcParentScreen;