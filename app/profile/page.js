import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import Container from "../../components/container";


const page = async() => {
  const session = await getServerSession(authOptions)

  function getMembershipPlan(paymentAmount) {
    switch(paymentAmount) {
      case 15:
        return 'Student($15/year)';
      case 30:
        return 'Regular($30/year)';
      case 100:
        return 'Corporate($100/year)';
    }
  }
  const membershipPlan = getMembershipPlan(session.user.paymentAmount)
  
  if(session?.user) {
    return (
      <Container className="xl:w-1/4 lg:w-1/2">
        <h1 className="text-2xl text-center font-bold text-gray-800 mb-5 lg:text-2xl lg:leading-tight xl:text-2xl xl:leading-tight">Member Profile</h1>
        <div className="border-2 p-5 border-neutral-400 text-gray-800 w-full max-w-[30rem] min-h-[10rem] bg-white shadow-2xl rounded-md">
          <div className="mb-2"> First name: {session?.user.firstname}</div>
          <div className="mb-2">Last name: {session?.user.lastname}</div>
          <div className="mb-2">Email: {session?.user.email}</div>
          <div className="mb-2">Membership plan: {membershipPlan}</div>
          <div className="mb-2">Membership starts date: {session.user.paymentDate}</div>
          <div className="mb-2">Membership expires date: {session.user.membershipExpiresAt}</div>
        </div>
      </Container>
    )

  
  }
}
export default page;


