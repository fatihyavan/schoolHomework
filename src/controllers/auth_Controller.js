
const data=require('../config/database');
const student_login= async(req,res)=>{
    console.log("homedayiz");
    console.log(req.flash('loginMistake'));
    res.render('student_login',{layout:'./layouts/auth_layout',messages:req.flash('loginMistake')});

};
const teacher_login=async(req,res)=>{
    console.log("teacher");
    res.render('teacher_login',{layout:'./layouts/auth_layout',messages:req.flash('loginMistake')});
};
const student_post = async(req,res)=>{
     data.pool.query("select * from school where email = $1 ",[req.body.email],(error,result)=>{
        if(!result.rows[0]){
            req.flash('loginMistake','Boyle bir kullanici yok');
            res.redirect('/studentLogin');
        }else{
        if( result.rows[0].role !== 'student' ){
            req.flash('loginMistake','Yetkiniz yok');
            res.redirect('/studentLogin');
        }
        else{
            if(result.rows[0].sifre === req.body.sifre){
                res.render('student',{layout:'./layouts/homework_layout',user : result.rows[0].email,homework:result.rows[0].homework});
                
            }else{
                console.log("Sifre hatali");
                req.flash('loginMistake','Email veya sifre hatali');
                res.redirect('/studentLogin');
                }  
           }
        }
    });
}
const teacher_post=async(req,res)=>{
    data.pool.query("select * from school where email = $1",[req.body.email],(error,result)=>{
        const sonuc = result.rows[0];
        if(!sonuc){
            req.flash('loginMistake','Bu okulda kaydiniz yok');
            res.redirect('/teacherLogin');
        }else{
            if(sonuc.role !== 'teacher'){
            req.flash('loginMistake','Bu okulun ogretmeni degilsiniz');
            res.redirect('/teacherLogin');
            }else{
            if(sonuc.sifre===req.body.sifre){
                data.pool.query('select * from school where teacher=$1',[sonuc.teacher_ad],(error,result)=>{
                    console.log(result.rows);
                    res.render('teacher',{layout:'./layouts/homework_layout',user : sonuc.email,students:result.rows});
                })
            }else{
                req.flash('loginMistake','Ogretmen sifreniz hatali');
                res.redirect('/teacherLogin');
            }
        }
    }
    });
};

const addingHomework=async(req,res)=>{
    console.log(req.body);
    data.pool.query("select * from school where email = $1",[req.body.mail],(error,result)=>{
      if(!result.rows){
          console.log("Oyle bir ogrenciniz bulunmuyor");
      }else{
          data.pool.query("update school set homework = $1 where email = $2 ",[req.body.homework,result.rows[0].email],(error,result)=>{
            res.redirect('/teacherLogin');
          } )
      }
    })
   
};

module.exports={
    student_login,
    teacher_login,
    student_post,
    teacher_post,
    addingHomework
};
