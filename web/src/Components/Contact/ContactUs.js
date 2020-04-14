import React, { Component } from 'react';
import PopPop from 'reactjs-popup';
import Button from '@material-ui/core/Button';
// import Dialog from 'react-dialog'
import '../../assets/CSS/bootstrap.css';
//import gecko from '../../assets/Img/Gecko.png';
import i18n from 'i18next' 

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      email: '',
      subject: '',
      message: '',
      response_ok: false,
      cont: ''
    };
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    // TODO: Fix the URL
    const res = await fetch('constants.exchange_server.url + constants.exchange_server.contact_script', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Contact: {
          email: this.state.email,
          subject: this.state.subject,
          message: this.state.message
        }
      })
    });
    const data = await res.json();
    return this.handleFormResponse(data);
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
  handleFormResponse = data => {
    if (data.result === true) {
      this.setState({ response_ok: true });
    }
  }

  toggleShow = show => {
    this.setState({ show });
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
        <Button onClick={() => this.toggleShow(true)} style={{ textDecoration: 'underline', textTransform: 'lowercase', color: 'white' }}>{i18n.t("contact")}</Button>
        {/* <Example/> */}
        <PopPop open={show}
          closeBtn={true}
          closeOnEsc={true}
          onClose={() => this.toggleShow(false)}
          closeOnOverlay={true}>
          <div style={{ textAlign: 'left', color: 'black' }}>
            <div className="shadow bg-1 p-4 rounded">
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
            </div>
          </div>
        </PopPop>
      </div>
    );
  }
}
