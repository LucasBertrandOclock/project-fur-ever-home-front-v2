'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import NextImage from 'next/image';
import { Button, Image, Input, Switch } from '@nextui-org/react';

import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import './page.scss';
import { actionThunkUserById } from '@/src/lib/thunks/user.thunk';
import { Edit, Trash } from 'react-feather';

function AccountPage() {
  const dispatch = useAppDispatch();

  const userRole = useAppSelector((state) => state.auth.connectedUser.role);

  useEffect(() => {
    if (!userRole) {
      redirect('/');
    } else {
      dispatch(actionThunkUserById());
    }
  }, []);

  const user = useAppSelector((state) => state.user.user);

  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [leavingDate, setLeavingDate] = useState('');
  const [role, setRole] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEmail(user.email);
    setLastname(user.lastname);
    setFirstname(user.firstname);
    setBirthdate(user.birthdate);
    setPassword(user.password);
    setLeavingDate(user.leaving_date);
    setRole(user.role);
    setIsActive(user.is_active);
  }, []);

  return (
    <form className="account-page">
      <h1 className="header">Profil</h1>
      <div className="input-field">
        <Image
          as={NextImage}
          width={300}
          height={300}
          radius="full"
          alt={user.firstname}
          src={'/' + user.avatar}
        />
        <div className="input-field--div">
          <Input
            isReadOnly={isReadOnly}
            size="lg"
            type="email"
            label="Email"
            labelPlacement="outside"
            placeholder={isReadOnly ? '' : user.email}
            name="email"
            value={isReadOnly ? user.email : email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isReadOnly={isReadOnly}
            size="lg"
            type="text"
            label="Prénom"
            labelPlacement="outside"
            placeholder={isReadOnly ? '' : user.firstname}
            name="firstname"
            value={isReadOnly ? user.firstname : firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Input
            isReadOnly={isReadOnly}
            size="lg"
            type="text"
            label="Nom"
            labelPlacement="outside"
            placeholder={isReadOnly ? '' : user.lastname}
            name="lastname"
            value={isReadOnly ? user.lastname : lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="input-field--div">
          <Input
            isReadOnly={isReadOnly}
            size="lg"
            type="date"
            label="Naissance"
            labelPlacement="outside"
            placeholder={isReadOnly ? '' : user.birthdate}
            name="birthdate"
            value={isReadOnly ? user.birthdate : birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <Input
            isReadOnly={isReadOnly}
            size="lg"
            type={isReadOnly ? 'password' : 'text'}
            label="Mot de passe"
            labelPlacement="outside"
            placeholder={isReadOnly ? '' : user.password}
            name="password"
            value={isReadOnly ? user.password : password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {userRole === 'Admin' && (
            <Input
              isReadOnly
              size="lg"
              type="text"
              label="Création du compte"
              labelPlacement="outside"
              placeholder={user.arrival_date}
              name="arrival_date"
              value={user.arrival_date}
            />
          )}
        </div>
        <div className="input-field--div">
          {userRole === 'Admin' && (
            <>
              <Input
                isReadOnly
                size="lg"
                type="text"
                label="Désactivation"
                labelPlacement="outside"
                placeholder={user.leaving_date ?? ' '}
                name="leaving_date"
                value={user.leaving_date}
              />
              <Input
                isReadOnly={isReadOnly}
                size="lg"
                type="text"
                label="Role"
                labelPlacement="outside"
                placeholder={isReadOnly ? '' : user.role}
                name="role"
                value={isReadOnly ? user.role : role}
                onChange={(e) => setRole(e.target.value)}
              />
              <Switch
                isReadOnly={isReadOnly}
                size="lg"
                isSelected={isReadOnly ? user.is_active : isActive}
                onValueChange={setIsActive}
              >
                Est Actif ?
              </Switch>
            </>
          )}
        </div>
      </div>
      <div>
        {isEditing ? (
          <Button
            className="btn"
            color="success"
            onClick={(e) => {
              e.preventDefault;
              setIsReadOnly(true);
              setIsEditing(false);
            }}
          >
            Enregistrer
          </Button>
        ) : (
          <>
            <Button
              className="btn-only"
              color="warning"
              onClick={(e) => {
                e.preventDefault;
                setIsReadOnly(false);
                setIsEditing(true);
              }}
            >
              Modifier <Edit />
            </Button>
            <Button className="btn-only" color="danger">
              Désactiver <Trash />
            </Button>
          </>
        )}
      </div>
    </form>
  );
}

export default AccountPage;
