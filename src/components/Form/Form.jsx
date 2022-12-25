import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from '@ionic/react';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { imageOutline, personCircleOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { storage, db } from '../../firebase';
import './Form.scss';


const initialState = {
  name: '',
  phone: '',
  email: '',
  type: '',
  whatsapp: false,
};

export const Form = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [ personData, setPersonData ] = useState(initialState);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    id && getSingleUser();
  }, [id]);


  const getSingleUser = async () => {
    const docRef = doc(db, 'people', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setPersonData({ ...snapshot.data() });
    }
  };

  const FileUploadHandler = (file) => {

    let name = new Date() + file.name;
    const storageRef = ref(storage, `profile-images/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      // Argument 1
      'state_changed',
      // Argument 2
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress < 100) {
          setIsSubmit(true)
        } else {
          setIsSubmit(false);
        }
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is Running');
            break;
          default:
            break;
        }
      },
      // Argument 3
      (error) => {
        console.log(error);
      },
      // Argument 4
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setPersonData((prev) => ({ ...prev, img: downloadUrl }));
        });
      }
    );
  };
    // Uplaod File Function Ends
 


  const onInputChange = (e) => {
      setPersonData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpsert = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!id) {
    try {  await addDoc(collection(db, 'people'), {
        ...personData,
    });
    } catch(error){
     console.log(error);
      }
    } else {
       try {
         await updateDoc(doc(db, 'people',id), {
           ...personData,
         });
       } catch (error) {
           console.log(error);
       }
    }
    setIsSubmit(true);
    history.replace('/');
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle className='ion-text-center ion-margin-top'>
          <div>{id ? 'Update' : 'Add'} Person </div>
          <IonIcon icon={personCircleOutline}></IonIcon>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <form onSubmit={handleUpsert}>
          <IonItem>
            <IonAvatar className='ion-margin'>
              <img alt='person' src={personData?.img} />
            </IonAvatar>
          </IonItem>
          <IonItem>
            <IonLabel position='floating' className='ion-capitalize'>
              Name
            </IonLabel>
            <IonInput
              clearInput={true}
              name='name'
              value={personData.name}
              type='text'
              required={true}
              onIonChange={onInputChange}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='floating' className='ion-capitalize'>
              Phone
            </IonLabel>
            <IonInput
              clearInput={true}
              type='number'
              name='phone'
              value={personData.phone}
              required={true}
              onIonChange={onInputChange}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='floating' className='ion-capitalize'>
              Email
            </IonLabel>
            <IonInput
              clearInput={true}
              name='email'
              type='email'
              value={personData.email}
              onIonChange={onInputChange}></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect
              interface='popover'
              name='type'
              value={personData.type}
              placeholder='Select Type'
              onIonChange={onInputChange}>
              <IonSelectOption value='Office'>Office</IonSelectOption>
              <IonSelectOption value='Home'>Home</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonCheckbox
              slot='end'
              name='whatsapp'
              checked={personData.whatsapp}
              onIonChange={(e) => setPersonData((prev) => ({ ...prev, whatsapp: e.target.checked }))}></IonCheckbox>
            <IonLabel>Whatsapp</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={imageOutline}></IonIcon>
            <span className='ion-margin-start'>
              <input type='file' name='file' accept='image/*' onChange={(e) => FileUploadHandler(e.target.files[0])} />
            </span>
          </IonItem>

          <div className='ion-margin-top ion-text-center'>
            {isSubmit ? (
              <IonSpinner name='crescent' color='secondary'></IonSpinner>
            ) : (
              <IonButton type='submit' color='primary'>
                {id ? 'UPDATE' : 'ADD'}
              </IonButton>
            )}
          </div>
        </form>
      </IonCardContent>
    </IonCard>
  );
};
