import { FC, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from 'src/index';
import Snackbars from 'src/Snackbars/Snackbars';
import { validationObject } from 'src/helper/helper-validate';
import logo from 'src/logos/mainLogo.svg';
import icon from 'src/logos/buildings.svg';
import './style.scss';

const Registration: FC = () => {
  const [user, setUser] = useState({
    login: '',
    password: '',
    passwordRepeat: ''
  });
  const { login, password, passwordRepeat } = user;
  const [snackText, setSnackText] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const { store } = useContext(Context);

  const openSnackbar = (message) => {
    setSnackOpen(true);
    setSnackText(message);
  };

  const checker = async (login: string, password: string, passwordRepeat: string) => {
    try {
      if (!validationObject(login)) {
        openSnackbar('Логин должен содержать не менее 6 символов!');
        return;
      }
      if (!validationObject(password)) {
        openSnackbar('Длина пароля должна быть не менее 6 символов, обязательно содежать латинские буквы и содержать хотя-бы одну цифру!');
        return;
      }
      if (passwordRepeat !== password) {
        openSnackbar('Пароль или его повтор неверен! Пожалуйста, проверьте свои введенные данные!');
        return;
      }
      await store.registration(login, password);
    } catch (e) {
      openSnackbar(`Произошла ошибка во время регистрации пользователя`)
    }
  };

  const handleChange = (value: any, type: any) => {
    setUser({ ...user, [type]: value });
  };

  return (
    <div className='registration'>
      <div className='registration__header'>
        <Snackbars
          snackText={snackText}
          snackOpen={snackOpen}
          setSnackOpen={setSnackOpen}
        />
        <img className='registration__header__logo' src={logo} alt='' />
        <div className='registration__header__title'>
          <p>Зарегистрироваться в системе</p>
        </div>
      </div>
      <div className='registration__wrapper'>
        <img className='registration__wrapper__icon' src={icon} alt='' />
        <div className='registration__wrapper__form'>
          <h1 className='registration__wrapper__form__title'>Регистрация</h1>
          <div className='registration__wrapper__form__label'><p>Логин:</p></div>
          <input
            className='registration__wrapper__form__field'
            name='login'
            type='text'
            placeholder='Логин'
            value={login}
            onChange={(e) => handleChange(e.target.value, 'login')}
          />
          <div className='registration__wrapper__form__label'><p>Пароль:</p></div>
          <input
            className='registration__wrapper__form__field'
            type='password'
            placeholder='Пароль'
            value={password}
            onChange={(e) => handleChange(e.target.value, 'password')}
          />
          <div className='registration__wrapper__form__label'><p>Повторите пароль:</p></div>
          <input
            className='registration__wrapper__form__field'
            type='password'
            placeholder='Повторите пароль'
            value={passwordRepeat}
            onChange={(e) => handleChange(e.target.value, 'passwordRepeat')}
          />
          <button
            className='registration__wrapper__form__registrate'
            type='button'
            onClick={() => checker(login, password, passwordRepeat)}
          >
            Зарегистрироваться
          </button>
          <Link to='/login'
            className='registration__wrapper__form__authorizate'
          >
            Авторизоваться
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;