// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 申请邮箱验证码 业务级验证码申请接口，集成限流与防爆破逻辑 POST /mail/code/add */
export async function addEmailCode(body: API.EmailCodeRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseEmailCodeVO>('/mail/code/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除邮箱验证码 显式使指定邮箱的验证码失效 POST /mail/code/delete */
export async function deleteEmailCode(
  body: API.EmailCodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/mail/code/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 校验邮箱验证码 验证用户输入的验证码是否与缓存一致且未过期 POST /mail/code/verify */
export async function verifyEmailCode(
  body: API.EmailCodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/mail/code/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 异步发送邮件 基于 MQ 分离发送流程，提升接口吞吐量 POST /mail/send/async */
export async function doSendMailAsync(body: API.MailSendRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/mail/send/async', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 同步发送邮件 阻塞式发送简单或 HTML 邮件 POST /mail/send/sync */
export async function doSendMailSync(body: API.MailSendRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/mail/send/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 快速发送验证码邮件 使用默认模板发送纯验证码通知 POST /mail/send/verification-code */
export async function doSendVerificationCode(
  body: API.MailSendCodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/mail/send/verification-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
