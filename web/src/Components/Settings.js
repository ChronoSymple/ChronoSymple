import React, {PureComponent, Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider, Button } from '@material-ui/core';
import i18n from 'i18next';
import PropTypes from 'prop-types';

export default class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lang: i18n.t('language'),
      value: 'Fra'
    };
  }

  handleChange  = () => {
    if (i18n.language === 'en') {
      localStorage.setItem('lang', 'fr');
      i18n.changeLanguage('fr');
      this.setState({lang: 'English', value: 'en'});
    } else if (i18n.language === 'fr') {
      localStorage.setItem('lang', 'en');
      i18n.changeLanguage('en');
      this.setState({lang: 'Français', value: 'fr'});
    } else {
      i18n.changeLanguage('en');
      this.setState({lang: 'Français', value: 'fr'});
    }
    this.forceUpdate();
    this.props.appController.forceUpdate();
  };
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h4">{i18n.t('settings')}</Typography>
          <br/>
          <br/>
          <Divider />
          <Typography variant="h5">
            {i18n.t('lang')}
          </Typography>
          <Button onClick={this.handleChange} variant='contained' color="primary">{this.state.lang}</Button>
        </CardContent>
      </Card>
    );
  }
}

Settings.propTypes = {
  appController: PropTypes.instanceOf(Component).isRequired
};