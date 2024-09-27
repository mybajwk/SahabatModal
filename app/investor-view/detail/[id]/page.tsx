function InvestorDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="min-h-screen w-full bg-conic-blue">
      {/* Rendering the ID to ensure it's correctly fetched */}
      <h1>Investor ID: {id}</h1>
    </div>
  );
}

export default InvestorDetail;
