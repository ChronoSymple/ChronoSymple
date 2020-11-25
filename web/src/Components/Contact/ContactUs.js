import React, { Component } from 'react';
import PopPop from 'reactjs-popup';
import Button from '@material-ui/core/Button';
// import Dialog from 'react-dialog'
//import gecko from '../../assets/Img/Gecko.png';
import i18n from 'i18next';
import Api from '../../Api';

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      email: '',
      subject: '',
      message: '',
      responseOk: false,
      cont: '',
      send: false,
      error: ''
    };
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    try {
      await Api.sendMail(localStorage.getItem('myToken'), {
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message
      });
      this.setState({ send: true });
    } catch (e) {
      this.setState({ error: e.toString() });
    }
  }

  handleChangeEmail = data => {
    this.setState({ email: data.target.value });
  }
  handleChangeSubject = data => {
    this.setState({ subject: data.target.value });
  }
  handleChangeMessage = data => {
    this.setState({ message: data.target.value });
  }

  display = () => {
    this.setState({ show: true });
  }
  hide = () => {
    this.setState({ show: false, send: false, email: '', subject: '', message: '', });
  }

  // init = () => {
  //   // if (this.state.cont === '')
  //   //   this.setState({cont: i18n.t("contact")});
  //   if (i18n.language === 'fr')
  //     this.setState({cont: "Contactez nous"});
  //   else if (i18n.language === 'en')
  //     this.setState({cont: "Contact Us"});
  //   else 
  //     this.setState({cont: "contactez nous"});
  // }
  render() {
    // this.init();
    const { show } = this.state;
    return (
      <div>
        <Button onClick={this.display} style={{ textDecoration: 'underline', textTransform: 'lowercase', color: 'white' }}>{i18n.t('contact') || 'Contact us'}</Button>
        {/* <Example/> */}
        <PopPop open={show}
          closeBtn={true}
          closeOnEsc={true}
          onClose={this.hide}
          closeOnOverlay={true}>
          <div style={{ textAlign: 'left', color: 'black' }}>
            {this.state.error !== '' ? <div>{this.state.error}</div> :
              this.state.send === false ? <div className="shadow bg-1 p-4 rounded">
                <form className={`form form-contact${this.state.response_ok ? ' submitted' : ''}`} name="form-contact" data-response-message-animation="slide-in-up" onSubmit={this.handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact_email" className="bold mb-0">Adresse E-mail</label>
                    <small id="emailHelp" className="form-text color-2 mt-0 mb-2 italic">{'Nous ne partagerons jamais votre E-mail avec quelqu\'un d\'autre.'}</small>
                    <input type="email" name="Contact[email]" id="contact_email" className="form-control bg-1" placeholder="E-mail" value={this.state.email} onChange={this.handleChangeEmail} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact_email" className="bold">Sujet</label>
                    <input type="text" name="Contact[subject]" id="contact_subject" className="form-control bg-1" placeholder="Sujet" value={this.state.subject} onChange={this.handleChangeSubject} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact_email" className="bold">Message</label>
                    <textarea name="Contact[message]" id="contact_message" className="form-control bg-1" placeholder="En quoi pouvons-nous vous aider ?" rows="8" value={this.state.message} onChange={this.handleChangeMessage} required></textarea>
                  </div>
                  <div className="form-group">
                    <button id="contact-submit" data-loading-text="Envoi..." name="submit" type="submit" style={{ backgroundColor: '#5C6ED7' }} className="btn btn-accent btn-rounded">Envoyer</button>
                  </div>
                </form>
                <div className="response-message">
                  <div className="section-heading">
                    <i className="fas fa-check font-lg"></i>
                    {/* <p className="font-md m-0">Merci !</p>
                       <p className="response">Votre message a été envoyé, nous vous recontacterons dès que possible.</p> */}
                  </div>
                </div>
              </div> : <div>Votre requête a bien été envoyé.</div>
            }
          </div>
        </PopPop>
      </div>
    );
  }
}
