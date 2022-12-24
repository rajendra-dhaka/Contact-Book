import { IonIcon, IonAccordion, IonAccordionGroup, IonAvatar, IonItem, IonLabel } from '@ionic/react';
import { createOutline, eyeOutline, logoWhatsapp, trashOutline } from 'ionicons/icons';

import { Link } from 'react-router-dom';
import { useContactData } from '../../Context/DataContext';
import {LoaderSpin} from '../index'

import './ContactItem.scss';

export const ContactItem = () => {

  const { filteredContactData, removeContact } = useContactData();
  
  return (
    <IonAccordionGroup>
      {/* Accordion Start */}
      {filteredContactData.length > 0 ? (
        filteredContactData.map((person) => (
          <IonAccordion value={person.id} key={person.id}>
            <IonItem slot='header' color='light'>
              <IonAvatar className='ion-margin'>
                <img alt='profile' src={person.img} />
              </IonAvatar>
              <IonLabel>{person.name}</IonLabel>
            </IonItem>
            <div className='ion-padding cta' slot='content'>
              <IonIcon icon={logoWhatsapp}></IonIcon>
              <Link to={`view/${person.id}`}>
                <IonIcon icon={eyeOutline}></IonIcon>
              </Link>
              <Link to={`upsert/${person.id}`}>
                <IonIcon icon={createOutline}></IonIcon>
              </Link>
              <IonIcon icon={trashOutline} onClick={() => removeContact(person.id)}></IonIcon>
            </div>
          </IonAccordion>
        ))
      ) : (
        <LoaderSpin/>
      )}
      {/* Accordion Ends here */}
    </IonAccordionGroup>
  );
};


