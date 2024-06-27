import { useContext, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { StoreContext } from '~/context/storeContext/StoreContext';
import AuthAPI from '~/services/authAPI';
import LoadingState from '~/components/LoadingState/LoadingState';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState(null);
  const { loading, setLoading, setContextError, contextError, navigate } = useContext(StoreContext);
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 24
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 24
      }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 24,
        offset: 12
      }
    }
  };

  const getEmail = e => {
    setEmail(e.target.value);
  };

  const hanleGetVeriCode = async signupEmail => {
    try {
      setLoading(true);
      setContextError(null);
      if (!signupEmail) {
        return setContextError('Bạn chưa nhập email');
      }
      const sendCode = await AuthAPI.getCode(signupEmail);
      const code = sendCode.data?.message?.code;
      setAuthCode(code);

      setTimeout(() => {
        setAuthCode(null);
      }, 180000);
    } catch (error) {
      setContextError(error);
    } finally {
      setLoading(false);
    }
  };
  const [form] = Form.useForm();
  const onFinish = async values => {
    try {
      setLoading(true);
      setContextError(null);
      await AuthAPI.signup(values);
      navigate('/login');
    } catch (error) {
      setContextError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select
        style={{
          width: 70
        }}
      ></Select>
    </Form.Item>
  );

  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        initialValues={{
          prefix: '+84'
        }}
        layout='vertical'
        scrollToFirstError
      >
        <Form.Item
          name='firstName'
          label='Họ'
          rules={[
            {
              required: true,
              message: 'Hãy điền họ '
            }
          ]}
        >
          <Input style={{ width: 'full' }} />
        </Form.Item>
        <Form.Item
          name='lastName'
          label='Tên'
          rules={[
            {
              required: true,
              message: 'Hãy điền tên '
            }
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'Email không hợp lệ'
            },
            {
              required: true,
              message: 'Hẫy nhập email!'
            }
          ]}
        >
          <Input value={email} onChange={getEmail} />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()._-])[A-Za-z\d@$!%*#?&^()._-]{8,24}$/,
              message: ' Mật khẩu bao gồm 1 chữ in hoa, 1 số, 1 ký tự đặc biệt'
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()._-])[A-Za-z\d@$!%*#?&^()._-]{8,24}$/,
              message: ' Mật khẩu bao gồm 1 chữ in hoa, 1 số, 1 ký tự đặc biệt'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='phoneNumber'
          label='Phone Number'
          rules={[
            {
              required: true,
              message: 'Hẫy nhập số điện thoại của bạn !'
            }
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%'
            }}
          />
        </Form.Item>
        <Form.Item
          name='accountType'
          label='Loại tài khoản'
          rules={[
            {
              required: true,
              message: 'Hãy chọn loại tài khoản'
            }
          ]}
        >
          <Select placeholder='Hãy chọn loại tài khoản'>
            <Option value='Học viên'>Học viên</Option>
            <Option value='Giảng viên'>Giảng viên</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name='gender'
          label='Gender'
          rules={[
            {
              required: true,
              message: 'Hãy chọn giới tính!'
            }
          ]}
        >
          <Select placeholder='select your gender'>
            <Option value='Nam'>Nam</Option>
            <Option value='Nữ'>Nữ</Option>
            <Option value='Khác'>Khác</Option>
          </Select>
        </Form.Item>

        <Form.Item label='Mã xác thực' extra=''>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name='captcha'
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập mã xác thực của bạn '
                  },
                  {
                    validator: (_, value) =>
                      +value === +authCode
                        ? Promise.resolve()
                        : Promise.reject(new Error('Mã không hợp lệ'))
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Col span={40}>
                <div className='h-3  '>
                  {' '}
                  <div className='text-[13px] animate-get-code-success-bg-fade-in text-red-500 '>
                    {' '}
                    {contextError}
                  </div>
                  {!loading && authCode && (
                    <div className=' text-[13px] text-green-500 animate-get-code-success-bg-fade-in '>
                      {' '}
                      Vui lòng kiểm tra email{' '}
                    </div>
                  )}
                </div>
              </Col>
            </Col>

            <Col span={12}>
              {loading ? (
                <LoadingState />
              ) : (
                <Button onClick={() => hanleGetVeriCode(email)}>Lấy mã xác thực</Button>
              )}
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name='agreement'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Hãy đồng ý các thỏa thuận'))
            }
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            Tôi đã đọc các <a href=''>thỏa thuận</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' className='bg-blue-500'>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
      <div className='text-center text-xs font-bold '>
        Đã có tài khoản ?{' '}
        <Link to='/login' className='text-blue-500 no-underline font-bold'>
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default Signup;
