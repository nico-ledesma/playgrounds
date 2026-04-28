import _ from 'lodash';
import { print } from '../utils/print.js';

const arr1 = ['aaa', 'bbb', 'cc'];
const arr2 = ['ddd', 'eee', 'fff'];
const arr3 = [1, 2, 3];
const arr4 = [4, 5, 6];
const obj1 = { aaa: 1, bbb: 2, ccc: 3 };
const obj2 = { ddd: 4, eee: 5, fff: 6 };

const res = _.union(arr1, arr2);

print(res);
