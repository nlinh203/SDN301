import { Hr, Modal } from '@components/uiCore';
import { multiFormatDateString } from '@utils';
import React, { useEffect, useState } from 'react';
import { BiSolidCheckCircle } from 'react-icons/bi';
import {posts} from "../../data";

const News = ({ show, setShow }) => {
  const news = posts.filter(p => p.type === "news")

  return (
    <Modal noStaticBackdrop title="Coursera Replica New Feed" show={show} setShow={setShow} size="lg">
      {news?.length > 0 ? (
        <div className="flex flex-col gap-8 h-[80vh] overflow-scroll">
          {news.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-4 p-8">
                <div>
                  <span className="font-medium text-lg">
                    <span className="text-red-500">#</span> {item.title}
                  </span>
                  <Hr />
                </div>
                <span>{item.description}</span>
                <div className="w-full h-96 rounded-lg">
                  <div className="w-full h-96 bg-cover rounded-lg bg-primary-100" style={{ backgroundImage: `url('${item.image}')` }}></div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                <div className="flex gap-2 items-center">
                  <span>Đăng bởi</span>
                  <i className="font-medium text-red-500">{item?.by?.fullName}</i>
                  <BiSolidCheckCircle size={20} className="text-primary" />
                  <span>•</span>
                  <span>{multiFormatDateString(item?.createdAt)}</span>
                </div>
                <Hr />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 font-medium text-lg">Chưa có thông báo nào được tạo!</div>
      )}
    </Modal>
  );
};

export default News;
