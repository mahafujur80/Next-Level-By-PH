//!Generic হলো এমন একটা system, যেখানে function, type বা interface তৈরি করার সময় নির্দিষ্ট data type না দিয়ে পরে type নির্ধারণ করতে পারি।

//* wrap in array by generic
const wrapInArray =<T>(value: T)=>{
 
    return [value]
};

const numberArr = wrapInArray<number>(2424);
const stringArr = wrapInArray<string>("Hello Developer");

stringArr.map(item => item.toUpperCase())

//* Generic with api response
interface User {
        name: string;
        role: string;
};

interface Blog{
        title: string;
        description: string;
        date: string;
};


interface ApiResponse <T> {
    data: T;
    success: boolean;
    statusCode: number;
};

//? interface UsersResponse extends ApiResponse<User> {}    // interface diye kora jay
type UserResponse = ApiResponse<User>;
type BlogResponse = ApiResponse<Blog>;

const userRes : UserResponse = {
   data:{
    name: "name",
    role: "role"
   },
   statusCode: 234,
   success: true,
}