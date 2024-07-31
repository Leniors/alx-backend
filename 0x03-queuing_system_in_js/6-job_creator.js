import kue from 'kue';

const queue = kue.createQueue({name: 'push_notification_code'});

const jobData = {
    phoneNumber: '',
    message: '',
}
const job = queue.create('push_notification_code', jobData);

job
  .on('enqueue', () => {
    console.log('Notification job created:', job.id);
  })
  .on('complete', () => {
    console.log('Notification job completed');
  })
  .on('failed attempt', () => {
    console.log('Notification job failed');
  });
job.save();
