import React, { useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { formatNumber } from '@utils';
import { Button, Link, Rating } from '@components/uiCore';

const CourseCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isPro = item.price > 0

}