import { Hr } from '@components/uiCore';
import React, { useEffect, useState } from 'react';
import CourseCard from '../home/CourseCard';
import { SelectFormV2 } from '@components/form';
import { orderBy, orderType } from '@constant';
import { Pagination } from '@components/base';
import Filter from './Filter';
import { useGetParams } from '@hook';
import {courses} from "../../../data";

const WebCourses = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [sort, setSort] = useState({ orderBy: 'createdAt', orderType: -1 });

  useEffect(() => {
    if (sort?.orderBy && sort?.orderType) {
      const object = {};
      object[sort.orderBy] = sort.orderType;
      setParams({ ...params, sort: object });
    }
  }, [sort?.orderBy, sort?.orderType]);

  return (
    <div className="flex mt-24">
      <div className="w-[400px] min-h-screen p-4">
        <Filter params={params} setParams={setParams} />
      </div>
      <div className="w-full min-h-screen p-4">
        <div className="card !p-0">
          <div className="h-16 flex gap-2 items-center p-4">
            <h4>Sắp xếp theo:</h4>
            <SelectFormV2
              data={orderBy}
              clearBtn={false}
              value={sort?.orderBy}
              onValueChange={(e) => setSort({ ...sort, orderBy: e.value })}
            />
            <SelectFormV2
              data={orderType}
              clearBtn={false}
              value={sort?.orderType}
              onValueChange={(e) => setSort({ ...sort, orderType: e.value })}
            />
          </div>
          <Hr />
          <div className="p-4 flex flex-wrap mt-4">
            {courses.length > 0 ? (
                courses.map((item, index) => {
                return (
                  <div key={index} className="xs:w-full sm:w-6/12 md:w-4/12 py-2">
                    <CourseCard item={item} type={item.price ? 'pro' : 'free'} />
                  </div>
                );
              })
            ) : (
              <div className="p-4 font-medium text-lg">Chưa có khóa học nào được tạo!</div>
            )}
          </div>
          <Hr />
          <div className="flex justify-center my-4">
            <Pagination totalRecord={courses.length} params={params} setParams={setParams} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebCourses;
